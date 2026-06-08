import "./Skewb.css";
import { polygons, type SkewbRendererState } from './utils/skewbRenderer';

function SkewbRenderer({ state }: { state: SkewbRendererState }) {
    return (
        <div className="skewb-box">
            <svg version="1.1"
                viewBox="0 0 200 150"
                xmlns="http://www.w3.org/2000/svg">
                {polygons.map((polygon, i) => (
                    <polygon
                        key={polygon.toSVGPointsString()}
                        points={polygon.toSVGPointsString()}
                        style={{
                            fill: `${state[i]}`,
                            stroke: "black",
                            strokeWidth: 0.5,
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}

export default SkewbRenderer;