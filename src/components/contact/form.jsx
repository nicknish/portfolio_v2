import React from 'react';
import NetlifyForm from './netlifyForm';

const INPUT_CLASSNAMES = `w-100 ba b--black-20 pa2 mb2 br2`;
const TEXTAREA_CLASSNAMES = `${INPUT_CLASSNAMES} h4`;

const Label = ({ label, id }) => (
  <label className="db mb2 b" htmlFor={id}>
    {label}:
  </label>
);

export default class ContactForm extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.submitting) return;
    this.setState({ submitting: true });

    this.props.handleSubmit(this.state).then(() => {
      this.setState({ submitting: false });
    });
  };

  handleChange = e => {
    if (this.state.submitting) return;
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, message, submitting } = this.state;
    const { formName } = this.props;

    return (
      <NetlifyForm
        className="contactForm container"
        name={formName}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        <div className="mb3">
          <Label label="Name" id="contact-name" />
          <div className="control">
            <input
              className={INPUT_CLASSNAMES}
              name="name"
              id="contact-name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="mb3">
          <Label label="Email" id="contact-email" />
          <div className="control">
            <input
              className={INPUT_CLASSNAMES}
              name="email"
              id="contact-email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="mb3">
          <Label label="Message" id="contact-message" />
          <div className="control">
            <textarea
              name="message"
              className={TEXTAREA_CLASSNAMES}
              id="contact-message"
              value={message}
              placeholder="Hi there!"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="u-textCenter">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={submitting}
          >
            Send Message
          </button>
        </div>
      </NetlifyForm>
    );
  }
}