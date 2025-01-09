import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
  };

  timerId = 0;

  timeToday = 0;

  handleStart = () => {
    if (this.timerId) {
      return;
    }

    this.setState({
      hasClock: true,
    });

    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3000);

    this.timeToday = window.setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));
      this.setState({
        today: new Date(),
      });
    }, 1000);
  };

  handleStop = () => {
    window.clearInterval(this.timerId);
    window.clearInterval(this.timeToday);
    this.setState({
      hasClock: false,
    });
    this.timerId = 0;
  };
  // This code starts a timer

  componentDidMount(): void {
    this.handleStart();
    document.addEventListener('click', () => {
      this.handleStart();
    });

    document.addEventListener('contextmenu', event => {
      event.preventDefault();
      this.handleStop();
    });
  }

  componentWillUnmount(): void {
    this.handleStop();
    document.removeEventListener('click', this.handleStart);
    document.removeEventListener('contextmenu', this.handleStop);
  }

  render() {
    const { hasClock, today, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} today={today} />}
      </div>
    );
  }
}
