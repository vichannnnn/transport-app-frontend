import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Map.css';
import { ReactComponent as MapSvg } from '../map.svg';
import { fetchShortestPath, Circle } from '../api/api';


interface Props {
  apiUrl?: string;
}

const Map: React.FC<Props> = ({ apiUrl = '' }) => {
  const [startCircleId, setStartCircleId] = useState<string | null>(null);
  const [endCircleId, setEndCircleId] = useState<string | null>(null);
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const handleCircleClick = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
  const target = event.currentTarget;
  const circleId = target.getAttribute('id') as string;

    if (startCircleId === null) {
      setStartCircleId(circleId);
    } else if (endCircleId === null && circleId !== startCircleId) {
      setEndCircleId(circleId);
    } else {
      // Clear previous selection
      setStartCircleId(null);
      setEndCircleId(null);
      setShortestPath([]);
      const circleElements = circleRefs.current;
      circleElements.forEach((circleRef) => {
        if (circleRef.current) {
          circleRef.current.classList.remove("clicked", "highlighted");
        }
      });
      target.classList.add("clicked");
    }

    // Toggle clicked and highlighted classes
    if (circleId === startCircleId) {
      setStartCircleId(null);
      target.classList.remove("clicked", "highlighted");
    } else if (circleId === endCircleId) {
      setEndCircleId(null);
      target.classList.remove("clicked", "highlighted");
    } else {
      target.classList.toggle("clicked");
      target.classList.toggle("highlighted");
    }
  }, [startCircleId, endCircleId]);

  const circleRefs = useRef<(SVGCircleElement | any)[]>([]);

  useEffect(() => {
    const circleElements = Array.from(document.querySelectorAll('.map-svg circle'));
    const circleData = circleElements.map((circle) => ({
      id: circle.getAttribute('id')!,
      x: circle.getAttribute('cx')!,
      y: circle.getAttribute('cy')!,
      radius: circle.getAttribute('r')!,
    }));

    setCircles(circleData);
    circleRefs.current = circleElements.map(() => React.createRef());

    circleElements.forEach((circle, index) => {
      circleRefs.current[index].current = circle;
      circle.addEventListener('click', handleCircleClick as any);
    });

    return () => {
      circleElements.forEach((circle) => {
        circle.removeEventListener('click', handleCircleClick as any);
      });
    };
  }, [handleCircleClick]);

  useEffect(() => {
    async function fetchPath() {
      const result = await fetchShortestPath(apiUrl, startCircleId, endCircleId, circles);
      setShortestPath(result);
    }
  
    fetchPath();
  }, [apiUrl, startCircleId, endCircleId, circles]);
  
  
  useEffect(() => {
    const circleElements = circleRefs.current;
    circleElements.forEach((circleRef) => {
      const circleId = circleRef.current?.getAttribute('id') as string;
      if (circleId && shortestPath.includes(circleId)) {
        circleRef.current?.classList.add("highlighted");
      } else {
        circleRef.current?.classList.remove("highlighted");
      }
    });
  }, [shortestPath, circleRefs]);

  return (
    <div className="map-container">
      <MapSvg className="map-svg">
        {circles.map((circle, index) => (
          <circle
            key={circle.id}
            id={circle.id}
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            className={shortestPath.includes(circle.id) ? "highlighted" : ""}
            ref={circleRefs.current[index]}
          />
        ))}
      </MapSvg>
    </div>
  );
};

export default Map;
