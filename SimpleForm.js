import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import PropTypes from 'prop-types';

class Review extends Component {
  constructor(props) {
    super(props);

    const { steps } = props;
    const { name, gender, age } = steps;

    this.state = {
      name: name.value,
      gender: gender.value,
      age: age.value,
    };
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  state = {
    showChatbot: false,
    showExitMessage: false,
  };

  toggleChatbot = () => {
    this.setState((prevState) => ({
      showChatbot: !prevState.showChatbot,
      showExitMessage: false, // Reset the exit message status
    }));
  };

  handleExitMessage = () => {
    this.setState({ showExitMessage: true });

    // After 5 seconds, close the chatbot
    setTimeout(() => {
      this.toggleChatbot();
    }, 5000);
  };

  handleExitBot = () => {
    setTimeout(() => {
      this.toggleChatbot();
    }, 2000);
  };

  render() {
    const { showChatbot, showExitMessage } = this.state;

    return (
      <div>
        {!showChatbot ? (
          <div
            className="button"
            onClick={this.toggleChatbot}
            style={{
              position: 'fixed',
              bottom: '200px',
              right: '45%',
              width: '150px',
              height: '60px',
              backgroundColor: '#197B22',
              borderRadius: '20%',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Enroll Now!
          </div>
        ) : (
          <>
            <ChatBot
              headerTitle="GeekBot"
              steps={[
                {
                  id: '0',
                  message: 'Hello, Welcome to student info system! ',
                  trigger: 'got-it',
                },
                {
                  id: 'got-it',
                  options: [
                    { value: 'got_it', label: 'Got it', trigger: '1' },
                  ],
                },
                {
                  id: '1',
                  message: 'Enter your Name',
                  trigger: 'name',
                },
                {
                  id: 'name',
                  user: true,
                  trigger: '3',
                },
                {
                  id: '3',
                  message: 'Hi {previousValue}! What is your gender?',
                  trigger: 'gender',
                },
                {
                  id: 'gender',
                  options: [
                    { value: 'male', label: 'Male', trigger: '5' },
                    { value: 'female', label: 'Female', trigger: '5' },
                  ],
                },
                {
                  id: '5',
                  message: 'Enter your Age',
                  trigger: 'age',
                },
                {
                  id: 'age',
                  user: true,
                  trigger: '7',
                  validator: (value) => {
                    if (isNaN(value)) {
                      return 'value must be a number';
                    } else if (value < 0) {
                      return 'value must be positive';
                    } else if (value > 120) {
                      return `${value}? Come on!`;
                    }
                    return true;
                  },
                },
                {
                  id: '7',
                  message: 'Great! Check out your summary',
                  trigger: 'review',
                },
                {
                  id: 'review',
                  component: <Review />,
                  asMessage: true,
                  trigger: 'end-message',
                },
                {
                  id: 'end-message',
                  message:
                    'Thanks! Your data was submitted successfully!',
                  end: true,
                },
              ]}
              handleEnd={this.handleExitBot}
            />
            {showExitMessage && (
              <div
                style={{
                  position: 'fixed',
                  bottom: '150px',
                  right: '45%',
                  width: '180px',
                  height: '40px',
                  backgroundColor: '#197B22',
                  borderRadius: '20%',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'default',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Thank you. In 5 seconds, the bot will exit
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default SimpleForm;
