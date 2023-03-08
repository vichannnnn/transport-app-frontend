import React from 'react';

interface Props {
  path: string[];
}

const ShortestPath: React.FC<Props> = ({ path }) => {
  return (
    <div className="shortest-path">
      <p>Shortest Path:</p>
      <ul>
        {path.map((circleId) => (
          <li key={circleId}>{circleId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShortestPath;
