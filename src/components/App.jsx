import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

import { Container } from 'App.styled';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const handleFeedback = item => {
    if (item === 'good') {
      setGood(prevState => prevState + 1);
    } else if (item === 'neutral') {
      setNeutral(prevState => prevState + 1);
    } else if (item === 'bad') {
      setBad(prevState => prevState + 1);
    }
  };

  function countTotalFeedback() {
    return Object.values(feedback).reduce((total, value) => total + value, 0);
  }

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback === 0
      ? 0
      : Math.round((feedback.good / countTotalFeedback()) * 100);
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleFeedback}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          ></Statistics>
        )}
      </Section>
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleFeedback = item => {
//     this.setState(prevState => {
//       return { [item]: prevState[item] + 1 };
//     });
//   };

//   countTotalFeedback = () => {
//     return Object.values(this.state).reduce((total, value) => total + value, 0);
//   };
//   countPositiveFeedbackPercentage = () => {
//     return this.countTotalFeedback === 0
//       ? 0
//       : Math.round((this.state.good / this.countTotalFeedback()) * 100);
//   };
//   render() {
//     const total = this.countTotalFeedback;
//     const percent = this.countPositiveFeedbackPercentage;
//     return (
//       <Container>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.handleFeedback}
//           ></FeedbackOptions>
//         </Section>

//         <Section title="Statistics">
//           {total() === 0 ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={this.state.good}
//               neutral={this.state.neutral}
//               bad={this.state.bad}
//               total={total}
//               positivePercentage={percent}
//             ></Statistics>
//           )}
//         </Section>
//       </Container>
//     );
//   }
// }
