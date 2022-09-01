<?php

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppointmentController extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $db,
    )
    {
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
        dd($appointments);
    }
}