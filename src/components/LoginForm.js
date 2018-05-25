import React from "react";
import { Card, Segment, Button, Form } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="ui two column centered grid">
        <div className="ui raised segment">
          <div className="ui large form">
            <div className="two fields">
              <div className="field">
                <input placeholder="Username" type="text" />
              </div>
              <div className="field">
                <input placeholder="Password" type="password" />
              </div>
            </div>
            <div className="ui submit button">Submit</div>
          </div>
        </div>
      </div>
    );
  }
}

// <Card raised centered>
//   <Form size={"big"}>
//     <Form.Group widths="equal">
//       <Form.Field control="input" placeholder="Username" />
//     </Form.Group>
//     <Form.Group widths="equal">
//       <Form.Field
//         control="input"
//         type="password"
//         placeholder="Password"
//       />
//     </Form.Group>
//     <Button fluid type="submit">
//       Login
//     </Button>
//   </Form>
// </Card>

export default LoginForm;
