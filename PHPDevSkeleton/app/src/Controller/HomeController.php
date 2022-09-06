<?php

namespace App\Controller;

use App\Entity\Location;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    public function __construct(protected EntityManagerInterface $db)
    {
    }

    #[Route('/home', name: 'home')]
    public function home(Request $request): Response
    {
        $user = $this->getUser();
        $locations = $this->db->getRepository(Location::class)->findAll();
        return $this->render('home/home.html.twig', [
            'locations' => $locations,
            'name' => $user->getName(),
            'calendar_style' => $user->getCalendarStyle(),
        ]);
    }

    #[Route('/', name: 'index')]
    public function index(): Response
    {
        return $this->redirectToRoute('app_login');
    }
}