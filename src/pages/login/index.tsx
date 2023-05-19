import React, { FC, useState } from "react";
import styles from "./index.module.scss";
import {
  Card,
  CardBody,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { login as loginRequest } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";

const Login: FC = () => {
  const toast = useToast();
  const { set } = useLocalStorage();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const login = (values: any) => {
    loginRequest(values).then((res) => {
      const { data } = res;
      if (data.code === 0) {
        toast({
          title: "Login Success.",
          // description: "We've created your account for you.",
          status: "success",
          position: "top",
          duration: 1500,
        });
        set("token", data.data.token);
        navigate("/");
      } else {
        toast({
          title: "Login Fail.",
          description: data.message,
          status: "error",
          position: "top",
          duration: 1500,
        });
      }
    });
  };

  const isRequired = (value: string) => {
    if (value === "") {
      return "必填";
    } else {
      return "";
    }
  };

  return (
    <div className={styles.login}>
      <Text fontSize="4xl" color="#F0F8FF">
        登录
      </Text>
      <Card width={"30%"} minWidth={300}>
        <CardBody padding={8}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              login(values);
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing={6}>
                  <Field name="email" validate={isRequired}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} autoComplete="emailq" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={isRequired}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>PassWord</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          autoComplete="current-password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Checkbox
                    isChecked={isRemember}
                    onChange={(e) => setIsRemember(e.target.checked)}
                  >
                    Remember Me
                  </Checkbox>
                  <Button colorScheme="teal" size="lg" type="submit">
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
