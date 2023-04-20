import './GameCarousel.css';
import { Carousel } from 'react-bootstrap';
import Drone from '/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Drone.png';
import Robot from '/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Robot.png';
import Psych from '/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Psych.png';

export default function GameCarousel() {
    return (
        <div className='GameCarousel'>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="carousel-image"
                        src={Drone}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-image"
                        src={Robot}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-image"
                        src={Psych}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}