import User from '../models/userModel';
import Todo from '../models/todoModel';

// Create a new todo
export const createTodo = async (req:any, res:any) => {
    try {
        console.log("req: ", req.body.userId)
        //const user = await User.findById(req.body.userId);
        // console.log("User: ", user)
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all todos
export const getTodos = async (req:any, res:any) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a todo
export const updateTodo = async (req:any, res:any) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a todo
export const deleteTodo = async (req:any, res:any) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addTodoForUser = async (req:any, res:any) => {
    try {
        // Check if user exists
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user exists, create the todo
        const newTodo = new Todo({
            ...req.body,
            userId: req.params.userId,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing to do for specific user
export const updateTodoForUser = async (req:any, res:any) => {
    try {
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id, userId: req.params.userId }, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found for this user' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an existing to do for specific user
export const deleteTodoForUser = async (req:any, res:any) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.params.userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found for this user' });
        }
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

