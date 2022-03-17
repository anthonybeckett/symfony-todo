<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: "api_todo")]
class TodoController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager, private TodoRepository $todoRepository)
    {

    }

    private function sendErrorResponse($e)
    {
        return $this->json([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }

    #[Route('/read', name: "api_todo_read", methods: "GET")]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];

        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: "api_todo_create", methods: ["POST"])]
    public function create(Request $request): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();

        $todo->setName($content->data->name);

        try {
            $this->entityManager->persist($todo);

            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray()
            ]);
        } catch (Exception $e) {
            return $this->sendErrorResponse($e);
        }
    }

    #[Route('/update/{id}', name: "api_todo_update", methods: ["PUT"])]
    public function update(Request $request, Todo $todo): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo->setName($content->name);

        try {
            $this->entityManager->flush();

            return $this->json(['success' => true]);
        } catch (Exception $e) {
            return $this->sendErrorResponse($e);
        }
    }

    #[Route('/delete/{id}', name: "api_todo_delete", methods: ["DELETE"])]
    public function delete(Todo $todo): \Symfony\Component\HttpFoundation\JsonResponse
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();

            return $this->json(['success' => true]);
        } catch (Exception $e) {
            return $this->sendErrorResponse($e);
        }
    }
}
