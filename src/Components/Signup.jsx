import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./register.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const type_p = isChecked ? "text" : "password";
  const schema = yup.object().shape({
    email: yup.string().email().required("Enter Valid Email"),
    password: yup.string().min(8, "Password must be atleast 8 characters"),
  });

  // useEffect(() => {
  //   const auth = localStorage.getItem("isLoggedIn");
  //   if (auth) {
  //     navigate("/");
  //   }
  // });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  // const [isChecked, setIsChecked] = useState("true");

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data);
    reset();
    navigate("/login");
  };

  // console.log(newdata);

  return (
    <div className="vh-100 d-flex ">
      <Col lg={7} className="h-100 d-sm-none d-md-block">
        <img
          src="https://images.unsplash.com/photo-1473283147055-e39c51463929?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="signUp-Wall"
          className="object-cover image"
        />
      </Col>
      <Col
        lg={5}
        sm={12}
        className="container d-flex flex-column justify-content-center align-items-center px-5"
      >
        <h1 className="fw-bold fs-1 mb-4">Sign Up</h1>
        <Form className="form-card" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger ps-1 mt-1">
                {"*" + errors.email.message}
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={type_p}
                placeholder="Password"
                {...register("password")}
              />
              <InputGroup.Text
                id="basic-addon1"
                onClick={() => setIsChecked((Prev) => !Prev)}
              >
                {isChecked ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill"></i>
                )}
              </InputGroup.Text>
            </InputGroup>
            {errors.password && (
              <p className="text-danger ps-1 mt-1">
                {"*" + errors.password.message}
              </p>
            )}
          </Form.Group>
          <div className="sign-in-button">
            <Button variant="primary" type="submit" className="sign-in-button">
              Sign Up
            </Button>
          </div>
          <p className="text-center mt-1 ps-4 ">
            Already have an account?<a href="/login">Login</a>
          </p>
        </Form>
      </Col>
    </div>
  );
};

export default Signup;
