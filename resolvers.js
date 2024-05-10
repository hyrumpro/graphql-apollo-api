const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Task } = require('./db');

const resolvers = {
    Query: {
        greetings: () => ['Hello', 'Bonjour', 'Hola'],
        tasks: async (_, __, { user }) => {
            try {
                if (!user) throw new Error('Authentication required');
                return await Task.find({ user: user.id });
            } catch (error) {
                console.error('Error fetching tasks:', error);
                throw error;
            }
        },
    },
    Mutation: {
        register: async (_, { input }) => {
            try {
                const { name, email, password } = input;
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({ name, email, password: hashedPassword });
                await user.save();
                return user;
            } catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        },
        login: async (_, { input }) => {
            try {
                const { email, password } = input;
                const user = await User.findOne({ email });
                if (!user) throw new Error('Invalid email or password');
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) throw new Error('Invalid email or password');
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return { token, user };
            } catch (error) {
                console.error('Error logging in:', error);
                throw error;
            }
        },
        createTask: async (_, { input }, { user }) => {
            try {
                if (!user) throw new Error('Authentication required');
                const task = new Task({ ...input, user: user.id });
                await task.save();
                return task;
            } catch (error) {
                console.error('Error creating task:', error);
                throw error;
            }
        },
        updateTask: async (_, { id, input }, { user }) => {
            try {
                if (!user) throw new Error('Authentication required');
                const task = await Task.findOneAndUpdate(
                    { _id: id, user: user.id },
                    input,
                    { new: true }
                );
                return task;
            } catch (error) {
                console.error('Error updating task:', error);
                throw error;
            }
        },
        deleteTask: async (_, { id }, { user }) => {
            try {
                if (!user) throw new Error('Authentication required');
                const task = await Task.findOneAndDelete({ _id: id, user: user.id });
                return task;
            } catch (error) {
                console.error('Error deleting task:', error);
                throw error;
            }
        },
    },
};

module.exports = {
    resolvers,
};