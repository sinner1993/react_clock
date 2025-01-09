import React from 'react';

type Props = {
  name: string;
};

type State = {
  today: Date;
};

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  timeToday: number = 0;

  handleStart = () => {
    if (this.timeToday) {
      return;
    }

    this.timeToday = window.setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));

      this.setState({
        today: new Date(),
      });
    }, 1000);
  };

  handleStop = () => {
    if (this.timeToday) {
      window.clearInterval(this.timeToday);
      this.timeToday = 0;
    }
  };

  handleClick = () => {
    this.handleStart();
  };

  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.handleStop();
  };

  componentDidMount(): void {
    this.handleStart();

    document.addEventListener('click', this.handleClick);
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount(): void {
    this.handleStop();
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  render() {
    const { name } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>
        {' time is '}
        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
