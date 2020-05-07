import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Table, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { addTodoAsync, removeTodoAsync } from "./actions";
import MainLayout from "../../components/MainLayout";

const Todo = (props) => {

  const [disabled, setDisabled] = useState(false);
  const [todo, setTodo] = useState({ id: Math.random(100), name: "" });

  const todos = useSelector((state) => state.todos);
  const total = useSelector(state => state.todos.length)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleRemove = (e, id) =>{
    e.preventDefault();
    dispatch(removeTodoAsync(id));
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setDisabled(true);
    dispatch(addTodoAsync(todo));

    setTodo({ id: Math.random(100), name: "" });

    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };

  return (
    <MainLayout>
      <Row>
        <Col sm={12} lg={12} md={12} className="mt-3">
          <Form onSubmit={handleAdd}>
            <FormGroup>
              <FormControl
                name="id"
                type="hidden"
                value={todo.id}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Descrição</FormLabel>
              <FormControl
                required="required"
                name="name"
                value={todo.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                variant="primary"
                disabled={disabled}
                className="float-right"
              >
                {disabled ? "Adicionando ..." : "Adicionar"}
              </Button>
            </FormGroup>
          </Form>
          <h1>Todos</h1>
          <Table hover striped responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {todos.length ? (
                todos.map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={(e) => handleRemove(e, todo.id)}
                          disabled={disabled}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" align="center">
                    Nenhum
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="3" align="right">
                  Total: {total}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Todo;
