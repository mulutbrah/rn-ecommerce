import React from "react";
import { Button, View, Text } from "react-native";

import t from "tcomb-form-native";

const Form = t.form.Form;

const Login = t.struct({
  email: t.String,
  password: t.String
});

const LoginForm = () => {
  function handleSubmit() {
    const value = _form.getValue();
    console.log("value: ", value);
  }

  return (
    <View style={{ width: "100%" }}>
      <Form ref={c => (_form = c)} type={Login} />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

export default LoginForm;
