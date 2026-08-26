-- Тестовий користувач
INSERT INTO users (email, password_hash)
VALUES ('test@example.com', 'placeholder_hash');

-- Категорії
INSERT INTO categories (name) VALUES
('Web Development'),
('JavaScript'),
('CSS'),
('Mathematics'),
('Literature');

-- Картки (user_id = 1, бо це перший і єдиний користувач)
INSERT INTO cards (user_id, question, answer, category_id, status, progress) VALUES
(1, 'What does HTML stand for?', 'HyperText Markup Language', 1, 'in_progress', 3),
(1, 'What does CSS stand for?', 'Cascading Style Sheets', 1, 'not_started', 0),
(1, 'What is the difference between let and const in JavaScript?', 'let allows reassignment, const creates a constant reference that cannot be reassigned. Both are block-scoped.', 2, 'in_progress', 2),
(1, 'What is a closure in JavaScript?', 'A function that has access to variables in its outer lexical scope, even after the outer function has returned.', 2, 'not_started', 0),
(1, 'What is the difference between == and === in JavaScript?', '== checks value equality with type coercion, === checks both value and type (strict equality).', 2, 'in_progress', 4),
(1, 'What is the purpose of the async keyword in JavaScript?', 'Declares an asynchronous function that returns a Promise and allows use of await inside it.', 2, 'in_progress', 2),
(1, 'What does DOM stand for?', 'Document Object Model', 1, 'in_progress', 3),
(1, 'What is Flexbox used for in CSS?', 'A CSS layout model that helps distribute space and align items in a container, making it easier to create responsive layouts.', 3, 'not_started', 0),
(1, 'What is the Pythagorean theorem?', 'In a right triangle, a² + b² = c², where c is the hypotenuse', 4, 'mastered', 5),
(1, 'Who wrote Romeo and Juliet?', 'William Shakespeare', 5, 'mastered', 5),
(1, 'What is the capital of France?', 'Paris', 1, 'not_started', 0);