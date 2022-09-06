<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Entity\Location;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\DateTime;

class AppointmentController extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $db,
    )
    {
    }

    #[Route('/deleteAppointment', name: 'app_delete_appointment')]
    public function deleteAppointment(Request $request): Response
    {
        $id = $request->request->get('id');

        $appointment = $this->db->getReference(Appointment::class, $id);

        if ($appointment !== null) {
            $this->db->remove($appointment);
            $this->db->flush();
            return new JsonResponse([
                'status' => 'null',
                'location_id' => $appointment->getLocation()->getId(),
                'date' => $appointment->getDate()->format('Y-m-d'),
            ]);
        }

        return new JsonResponse("We couldn't remove the appointment!");
    }

    #[Route('/getAppointments', name: 'app_get_appointment')]
    public function getAppointments(Request $request): Response
    {
        $date = $request->request->get('date');
        $location_id = $request->request->get('location_id');

        $appointments = $this->db->getRepository(Appointment::class)->findBy([
            'date' => \DateTime::createFromFormat('Y-m-d', $date),
            'location' => $location_id,
        ]);
        return new JsonResponse($this->fetchJsonResponseArrayFromGivenData($appointments));
    }

    #[Route('/setAppointment', name: 'app_set_appointment')]
    public function setAppointment(Request $request): Response
    {
        $date = $request->request->get('date');
        $location_id = $request->request->get('location_id');
        $user = $this->getUser();

        if ($this->isAppointmentsLimitReachedOnThisDate($user->getId(), $date, $location_id)) {
            return new JsonResponse('Appointments limit for this location has been exceeded...');
        } else {
            if ($this->isThereAnotherAppointmentByThisUserOnThisDate($user->getId(), $date, $location_id)) {
                return new JsonResponse('You have already made an appointment on this date...');
            } else if ($this->isAppointmentOnPastDate($date)) {
                return new JsonResponse('You can\'t make appointments in the past! (Without a time machine)');
            }
        }

        $location = $this->db->getRepository(Location::class)->findOneBy([
            'id' => $location_id,
        ]);

        $appointment = new Appointment();
        $appointment->setDate(\DateTime::createFromFormat('Y-m-d', $date));
        $appointment->setLocation($location);
        $appointment->setUser($user);

        $this->db->persist($appointment);
        $this->db->flush();

        return new JsonResponse('null');
    }

    public function isThereAnotherAppointmentByThisUserOnThisDate(int $user_id, string $date): bool
    {
        $targetAppointment = $this->db->getRepository(Appointment::class)->findOneBy([
            'user_id' => $user_id,
            'date' => \DateTime::createFromFormat('Y-m-d', $date),
        ]);

        return (bool)$targetAppointment;
    }

    public function isAppointmentsLimitReachedOnThisDate(int $user_id, string $date, int $location_id): bool
    {
        $capacity = $this->db->getRepository(Location::class)->findOneBy(['id' => $location_id])->getCapacity();

        $appointmentsOnGivenDateAtGivenLocation = $this->db->getRepository(Appointment::class)->findBy([
            'date' => \DateTime::createFromFormat('Y-m-d', $date),
            'location_id' => $location_id,
        ]);

        return count($appointmentsOnGivenDateAtGivenLocation) >= $capacity;
    }

    public function isAppointmentOnPastDate(string $date): bool
    {
        return date("Y-m-d") > date("Y-m-d", strtotime($date));
    }

    public function fetchJsonResponseArrayFromGivenData(array $array): array
    {
        $jsonArray = [];
        foreach ($array as $key => $arrayElement) {
            $user = $arrayElement->getUser();
            $location = $arrayElement->getLocation();
            $jsonArray[$key] = [
                'id' => $arrayElement->getId(),
                'name' => $user->getName(),
                'profile_picture' => $user->getProfilePicture(),
                'email' => $user->getEmail(),
                'country' => $location->getCountry(),
                'city' => $location->getCity(),
                'address' => $location->getAddress(),
                'isGivenUserLoggedIn' => $this->isGivenUserLoggedIn($arrayElement->getUser()),
            ];
        }
        return $jsonArray;
    }

    public function isGivenUserLoggedIn(User $user): bool
    {
        if ($user->getId() === $this->getUser()->getId()) {
            return true;
        }
        return false;
    }
}