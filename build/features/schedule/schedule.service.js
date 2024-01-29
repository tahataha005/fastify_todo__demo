"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUniqueTodos = exports.checkUniqueDay = void 0;
const checkUniqueDay = (schedules, day) => {
    const check = schedules.some((schedule) => {
        const current = schedule.day;
        return current.toDateString() === day.toDateString();
    });
    return check;
};
exports.checkUniqueDay = checkUniqueDay;
const checkUniqueTodos = (schedules, todos) => {
    const todoIds = new Set(todos);
    const check = schedules.some((schedule) => schedule.todos.some((todo) => todoIds.has(todo.id)));
    return check;
};
exports.checkUniqueTodos = checkUniqueTodos;
