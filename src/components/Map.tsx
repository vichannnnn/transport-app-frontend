import { useCallback, useEffect, useRef, useState } from 'react';
import { Circle, fetchShortestPath } from '../api/api';
import { ReactComponent as MapSvg } from '../map.svg';
import './Map.css';

interface MapProps {
  apiUrl: string;
}

export const Map: React.FC<MapProps> = ({ apiUrl }) => {
  const [startCircleId, setStartCircleId] = useState<string | null>(null);
  const [endCircleId, setEndCircleId] = useState<string | null>(null);
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);

  const handleCircleClick = useCallback(
    (event: React.MouseEvent<SVGCircleElement>) => {
      const target = event.currentTarget;
      const circleId = target.id;

      if (!startCircleId) {
        setStartCircleId(circleId);
      } else if (!endCircleId && circleId !== startCircleId) {
        setEndCircleId(circleId);
      } else {
        setStartCircleId(null);
        setEndCircleId(null);
        setShortestPath([]);
        circleRefs.current.forEach((circleRef) => {
          if (circleRef) {
            circleRef.classList.remove('clicked', 'highlighted');
          }
        });
        target.classList.add('clicked');
      }

      if (circleId === startCircleId) {
        setStartCircleId(null);
        target.classList.remove('clicked', 'highlighted');
      } else if (circleId === endCircleId) {
        setEndCircleId(null);
        target.classList.remove('clicked', 'highlighted');
      } else {
        target.classList.toggle('clicked');
        target.classList.toggle('highlighted');
      }
    },
    [startCircleId, endCircleId],
  );

  useEffect(() => {
    const circleElements = Array.from(document.querySelectorAll('.map-svg circle'));

    const circleData = circleElements.map((circle) => ({
      id: circle.id,
      x: circle.getAttribute('cx')!,
      y: circle.getAttribute('cy')!,
      radius: circle.getAttribute('r')!,
    }));

    setCircles(circleData);
    circleRefs.current = circleElements;

    circleElements.forEach((circle) => {
      circle.addEventListener('click', handleCircleClick);
    });

    return () => {
      circleElements.forEach((circle) => {
        circle.removeEventListener('click', handleCircleClick);
      });
    };
  }, [handleCircleClick]);

  useEffect(() => {
    async function fetchPath() {
      if (startCircleId && endCircleId) {
        const result = await fetchShortestPath(apiUrl, startCircleId, endCircleId, circles);
        setShortestPath(result);
      }
    }

    fetchPath();
  }, [apiUrl, startCircleId, endCircleId, circles]);

  useEffect(() => {
    circleRefs.current.forEach((circleRef) => {
      if (circleRef) {
        const circleId = circleRef.id;
        if (shortestPath.includes(circleId)) {
          circleRef.classList.add('highlighted');
        } else {
          circleRef.classList.remove('highlighted');
        }
      }
    });
  }, [shortestPath, circleRefs]);

  return (
    <div className="map-container">
      <MapSvg className="map-svg" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
};

