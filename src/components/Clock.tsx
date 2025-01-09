import React from 'react';

type Props = {
  today: Date;
  name: string;
};

export class Clock extends React.Component<Props> {
  render() {
    const { today, name } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
