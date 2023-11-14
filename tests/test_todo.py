import unittest
from todo import Todo

class TestTodo(unittest.TestCase):
    def test_mark_as_completed(self):
        todo_item = Todo("Test Todo", "Testing the mark_as_completed method")
        self.assertFalse(todo_item.completed)

        todo_item.mark_as_completed()
        self.assertTrue(todo_item.completed)

if __name__ == "__main__":
    unittest.main()
