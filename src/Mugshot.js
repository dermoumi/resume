import React, { Component } from 'react';

const LEYE_CENTER_X  = 73.63;
const LEYE_CENTER_Y  = 183.23;
const REYE_CENTER_X = 167.84;
const REYE_CENTER_Y = 181.41;

const LEYE_MAX_X = 90.00;
const LEYE_MIN_X = 50.00;
const LEYE_MAX_Y = 190.00;
const LEYE_MIN_Y = 166.00;

const REYE_MAX_X = 190.00;
const REYE_MIN_X = 140.00;
const REYE_MAX_Y = 190.00;
const REYE_MIN_Y = 166.00;

const VIEWBOX_WIDTH  = 321.3;
const VIEWBOX_HEIGHT = 383.4;


export default class MugShot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftEyeOffsetX: 0,
      leftEyeOffsetY: 0,
      rightEyeOffsetX: 0,
      rightEyeOffsetY: 0,
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.imageRef = React.createRef();
  }

  handleMouseMove(e) {
    this.lookAt(e.screenX, e.screenY);
  }

  lookAt(x, y) {
    const bbox = this.imageRef.current.getBoundingClientRect();

    const rEyeCenterX = bbox.left + bbox.width * REYE_CENTER_X / VIEWBOX_WIDTH;
    const rRelX = Math.max(-1, Math.min(1, (x - rEyeCenterX) / (bbox.width * 2)));
    const rOffsetX = rRelX * (rRelX < 0 ? REYE_CENTER_X - REYE_MIN_X : REYE_MAX_X - REYE_CENTER_X);

    const rEyeCenterY = bbox.top + bbox.height * REYE_CENTER_Y / VIEWBOX_HEIGHT;
    const rRelY = Math.max(-1, Math.min(1, (y - rEyeCenterY) / bbox.height));
    const rOffestY = rRelY * (rRelY < 0 ? REYE_CENTER_Y - REYE_MIN_Y : REYE_MAX_Y - REYE_CENTER_Y);

    const lEyeCenterX = bbox.left + bbox.width * LEYE_CENTER_X / VIEWBOX_WIDTH;
    const lRelX = Math.max(-1, Math.min(1, (x - lEyeCenterX) / (bbox.width * 2)));
    const lOffsetX = lRelX * (rRelX < 0 ? LEYE_CENTER_X - LEYE_MIN_X : LEYE_MAX_X - LEYE_CENTER_X);

    const lEyeCenterY = bbox.top + bbox.height * LEYE_CENTER_Y / VIEWBOX_HEIGHT;
    const lRelY = Math.max(-1, Math.min(1, (y - lEyeCenterY) / bbox.height));
    const lOffestY = lRelY * (lRelY < 0 ? LEYE_CENTER_Y - LEYE_MIN_Y : LEYE_MAX_Y - LEYE_CENTER_Y);

    this.setState({
      rightEyeOffsetX: rOffsetX,
      rightEyeOffsetY: rOffestY,
      leftEyeOffsetX: lOffsetX,
      leftEyeOffsetY: lOffestY,
    });
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove, {
      passive: true,
      capture: false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    return (<svg
        className={this.props.className}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 321.3 383.4"
        ref={this.imageRef}
      >
      <style type="text/css">
      {`
        .st{fill:none;stroke:#190C0C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st2{stroke-width:2;}
        .st3{stroke-width:3;}
        .st4{stroke-width:4;}
      `}
      </style>
      <defs>
        <path id="glassright" d="M192.5,156.7c-11.3-2.9-18.2-3.7-30.4-3.2c-12.1,0.5-27.6,2.7-31.6,9s-4.9,25.5,0,34.3
          c3.3,5.9,12.5,12.8,35,12.8c24.8-0.1,29.1-5,32.1-9.5s8-15.5,7-24.9C203.6,165.6,200.7,158.8,192.5,156.7z"/>
        <path id="glassleft" d="M39,158.8c11.3-2.9,18.2-3.7,30.4-3.2s27.6,2.7,31.6,9s4.9,25.5,0,34.3
          c-3.3,5.9-12.5,12.8-35,12.8c-24.8-0.1-29.1-5-32.1-9.5s-8-15.5-7-24.9C27.8,167.7,30.8,160.8,39,158.8z"/>
      </defs>
      <mask id="glassmask">
        <rect x="0" y="0" width="100%" height="100%" fill="black" />
        <use xlinkHref="#glassright" fill="white" />
        <use xlinkHref="#glassleft" fill="white" />
      </mask>
      <path className="st st4" d="M272.2,43.5c0,0-2.1-4-4.4-17.2c-1.9-10.6-1.8-10.3-3.5-15.2"/>
      <path className="st st4" d="M260.8,30.4C258,16,251.4,6.9,251.4,6.9"/>
      <path className="st st4" d="M96.4,13.1c0,0,28.5-10.1,72-11.1s92.3,28.3,92.3,28.3"/>
      <path className="st st4" d="M27.7,92.8C19.3,89.7,9.8,91,5,92c-1.7,0.4-3.2-1.1-3-2.9c3-18.7,27.9-33.4,31.7-35.5
        c0.2-0.1,0.2-0.4,0-0.5c-9-3.6-11.5-3.5-17.3-8.3c-1.6-1.3-1.2-3.8,0.7-4.5c20.4-7.8,42.6-9.7,47.6-10c0.4,0,0.6-0.5,0.4-0.8
        c-4.7-5.6-7.8-16.9-8.9-22.4C56,5.8,56.6,4,59.8,4.2c0,0,7.4,1.7,16.8,4.3c15.7,4.4,26.4,5.6,26.4,5.6"/>
      <path className="st st4" d="M128.9,320.7c-9.2,1.1-19,1-28.9-0.7c-59-10-56-109.8-56-109.8"/>
      <g mask={`url(#glassmask)`}>
        <path className="st st2"
          transform={`translate(${this.state.rightEyeOffsetX} ${this.state.rightEyeOffsetY})`}
          d="M164.6,157.5c-1.7,16.1,0.2,32.3,3.3,48.2c-0.1-15.2-0.3-30.5-0.4-45.7
          c-3.5,8.4-0.5,18.1-1.4,27.2c-0.6,5.4-2.5,11.1-0.1,16.1c-2.6-1.9-3.2-5.5-3.4-8.8c-1.1-12.5-0.8-25,0.7-37.4
          c1.8,1.3,2.4,3.7,2.8,5.8c2.4,13.3-0.9,27,0.6,40.4c0.8,0.2,1.3-0.8,1.4-1.5c3.2-15.1,2.9-30.7,2.5-46.1c0,17.2-0.1,34.3-0.1,51.5
          c6.8-14.4,5.5-31.2,4.1-47.1c0.3,14.2,0.3,28.5-0.1,42.7c-4-14.8,1.8-31-2.7-45.6c-0.3,4-0.4,8.1-0.3,12.1
          c0.1,12.7,1.8,25.5,0.6,38.1c-3.6-2.6-4.3-7.6-4.3-12c0-12.3,3.2-24.9-0.3-36.7c-0.3,15.7-0.9,31.4-2,47.1"/>
        <path className="st st2" mask={`url(#glassleftmask)`}
          transform={`translate(${this.state.leftEyeOffsetX} ${this.state.leftEyeOffsetY})`}
          d="M74.7,209.4c1.8-16.7,2.9-33.4,3.5-50.2c2.5,6.7,1.1,14.1,0.3,21.1c-0.9,8.7-0.7,17.5,0.5,26.1
          c1.9-15.4,3.8-31,1.8-46.4c-0.5,9.5-1,18.9-1.4,28.4c-0.3,6.6-0.9,13.6-5.1,18.6c-1.2-0.8-1.3-2.4-1.3-3.9c0-12.7,2.8-25.4,2.2-38.1
          c0-0.9-0.1-1.8-0.6-2.5s-1.6-1-2.3-0.5c-0.4,0.4-0.5,1-0.6,1.6c-1.4,13.9-1.2,27.9,0.8,41.7c0.3-8.1,0.6-16.3,0.9-24.4
          c0.2-6.4,0.5-12.8,2.2-19c3.4,6.8,2.5,15,1.2,22.5c-1.3,7.5-2.9,15.5-0.4,22.7c1-10.8,0.4-21.7-1.6-32.3c-1-5.2-2.3-10.8-0.1-15.7
          c2.7,7.7,1.9,16.3,0.3,24.3c-1.6,8.1-3.8,16.1-3.7,24.3c-1.8-15.9-2.4-31.9-1.8-47.9 M69.3,170.9c0,3.5-0.1,7-0.4,10.5
          c-0.3,4.7-0.9,9.4,0.1,14"/>
      </g>
      <path className="st st4" d="M84.7,259c0,0,12.6,12.2,20.3,17.6c1.4,1,3.1,1.3,4.7,1c6.4-1.1,24.7-5.4,51.7-19.9"/>
      <path className="st st4" d="M30.7,89.8c0,0-10.2,9.2-6.9,36.1c0.1,0.5,0.6,0.6,0.9,0.3c2.6-2.7,11.4-11.6,20.5-19.8
        c0.4-0.3,1-0.1,1.1,0.4c0.2,2.3,0.9,7.5,2.5,12.9"/>
      <path className="st st3" d="M83.5,81.5c0,0,2.4,12.2,17,26.5c9.5,9.3,16.5,14.8,20,17.3c0.8,0.6,1.9-0.2,1.6-1.1
        c-1.6-6.1-4.6-20.9,1.1-31.4"/>
      <path className="st st3" d="M117.2,83.8c0,0,6.4,12.9,26,23.3c24,12.7,37.2,12.7,37.2,12.7"/>
      <path className="st st3" d="M174,101.8c0,0,14.1,9.5,18.6,19.8c3.4,7.7,5,16.3,5.6,20.2c0.1,0.9,1.2,1.2,1.8,0.5
        c3.4-3.9,11.2-15.3,11.2-36.8"/>
      <path className="st st3" d="M210.4,117.3c0,0,0,17.4,8.8,29.4c4.7,6.4,11.6,12.9,19,16.4c1.3,0.6,2.7-0.8,2-2.1
        c-2.2-3.8-4.9-9.5-4-12.9"/>
      <path className="st st3" d="M231,158.9c0,0,9,16.8,10.9,35.7c0.1,0.8,1.1,1,1.5,0.4c2.3-3.5,7-12.5,9.8-30.1"/>
      <path className="st st3" d="M75.4,86.5c0,0-6.8,20.3,0,35"/>
      <path className="st st3" d="M166,107.8c0,0,6.7,3.8,20.7,5.1"/>
      <path className="st st3" d="M84.4,84.7c0,0-5,14.4-2,28.2"/>
      <use xlinkHref="#glassleft" className="st st3"/>
      <use xlinkHref="#glassright" className="st st3"/>
      <path className="st st3" d="M104.3,179.3c0,0,2.4-2.2,8.4-2.2c8.3-0.1,14.5,1.6,14.5,1.6"/>
      <path className="st st3" d="M237.3,173.9c0,0-17.5,0-32.7,1.2"/>
      <path className="st st3" d="M26.7,183.1c0,0-9.9,0.7-8.9-8.6c0.7-6.2,5.4-5.3,5.4-5.3"/>
      <path className="st st3" d="M203.8,168.9c-0.4,0,10.9-1.9,9.5,8.2c-1.3,10.1-5.2,8.9-5.2,8.9"/>
      <path className="st st3" d="M212.4,181.5c0,0,4.4-0.8,14.6-1.6c7.9-0.6,12-0.4,12-0.4"/>
      <path className="st st4" d="M44.8,156.5c0,0-0.9-5.7,4.1-36.9"/>
      <path className="st st3" d="M271.7,181.5c0,0-14.8-6.4-18.5,19.3c0,0,1,2.8,2.3,6.5c1.2,3.7-1,9.7-1,9.7"/>
      <path className="st st3" d="M254.2,196.7c0,0,6.1-5.7,11.8-5.7c5.1,0.1,8,4.3,7.5,9.3c-0.3,3.4-1.8,6.6-8,9.2"/>
      <path className="st st4" d="M280.8,53.8c0,0-1.2-11.1-4.4-22.2"/>
      <path className="st st4" d="M280.8,53.8c0,0,6.3,4.3,10.7,9c3.2,3.4,7,10.9,14.9,18c1,0.9,0,2.6-1.3,2.4l-9.7-2.5"/>
      <path className="st st4" d="M293.5,77.9c0,0,12.2,23.1,10.9,54.4c-1.3,31.3-21.1,74.4-25.4,86.2
        c-11.1,30.5-12.6,40.1-8.8,72c4.5,38,17.9,54.3,30.1,63.5c7.7,5.8,14,9.6,19.1,12.1"/>
      <path className="st st3" d="M250.2,230.6c0,0.7,2.9,14.9,8,23.6"/>
      <path className="st st3" d="M258.1,236c1.7,10.9,10.4,23.1,10.4,23.1"/>
      <path className="st st3" d="M137.8,361.8c0.1,5.4-0.4,8.3-1.9,13"/>
      <path className="st st4" d="M136.9,362.1c3.9-3.4-22.6,16.7-36.4,19.3"/>
      <path className="st st2" d="M114.8,253.9c0,2.4,0,4.8,0,7.3"/>
      <path className="st st2" d="M100.3,249.7c-1.4,2.9-3.1,5.7-5.1,8.3"/>
      <path className="st st2" d="M128.9,251.3c0.6,3.4,1.9,6.6,3.9,9.5"/>
      <path className="st st2" d="M145.6,245.7c1.6,2.5,3.8,4.6,6.4,6.1"/>
      <path className="st st2" d="M172.7,249.8c2.4,1.7,4.9,3.2,7.6,4.4"/>
      <path className="st st2" d="M85.4,245.3c-1.8,3.2-4,6.1-6.5,8.8"/>
      <path className="st st2" d="M68.8,262.3c-1.3,2.1-3.2,3.9-5.3,5.2"/>
      <path className="st st2" d="M74.8,250.3c-0.7,0.9-1.4,1.8-2,2.7"/>
      <path className="st st2" d="M61.8,276.6c-1.4,3.2-3.7,6-6.6,7.9"/>
      <path className="st st2" d="M53.2,271.4c-1.8,3.2-4.4,5.9-7.5,7.9"/>
      <path className="st st2" d="M63.1,294.9c-2,3.2-3.6,6.6-4.9,10.2"/>
      <path className="st st2" d="M71.1,287.8c-0.2,2.9-0.4,5.8-0.6,8.8"/>
      <path className="st st2" d="M85.3,280c-0.3,3.1-1.5,6.2-3.5,8.7"/>
      <path className="st st2" d="M70,305.8c-0.3,2-0.9,3.9-1.8,5.7"/>
      <path className="st st2" d="M85.1,304.6c-0.6,2.1-1.1,4.3-1.5,6.4"/>
      <path className="st st2" d="M89,317.8c0,2.5,0,5,0,7.5"/>
      <path className="st st2" d="M101.2,320.5c0.8,2.1,1.2,4.3,1.2,6.5"/>
      <path className="st st2" d="M100.1,290.6c-1,2.7-1.4,5.7-1,8.6"/>
      <path className="st st2" d="M120.6,299.6c1.1,1.8,1.9,3.8,2.4,5.8"/>
      <path className="st st2" d="M135.6,297c-0.3,2.7-0.2,5.4,0.3,8"/>
      <path className="st st2" d="M146.1,284.4c0.7,2.8,1.1,5.7,1.3,8.5"/>
      <path className="st st2" d="M162.4,276.5c0.2,2.7,0.7,5.4,1.6,8"/>
      <path className="st st2" d="M180.4,273c0.5,3.3,1.5,6.5,2.9,9.5"/>
      <path className="st st2" d="M191.9,269.8c1.4,2.5,3.8,4.3,6.6,5.2"/>
      <path className="st st2" d="M205.8,273.2c2,2.4,4.3,4.6,6.7,6.5"/>
      <path className="st st2" d="M199.8,253.2c2.6,3.7,4.8,2.6,8,5.7"/>
      <path className="st st2" d="M221,258.5c2.7,2.1,5.7,3.9,8.8,5.4"/>
      <path className="st st2" d="M223.2,245.7c4.4,2.1,7.2,2.6,12.1,3.2"/>
      <path className="st st2" d="M195.8,287.5c1,2.8,2,5.5,2.9,8.3"/>
      <path className="st st2" d="M184.8,292.3c0.3,4.1,1.1,8.1,2.3,12"/>
      <path className="st st2" d="M171.2,298c1.1,2.9,1.7,5.9,1.8,9"/>
      <path className="st st2" d="M163.2,307.5c1.6,3.1,2.4,6.5,2.5,10"/>
      <path className="st st2" d="M150.9,307c0.6,3.1,1.6,6.1,3,8.9"/>
      <path className="st st2" d="M135.5,316c0.7,3.5,1.5,7,2.2,10.5"/>
      <path className="st st2" d="M114.8,315.3c1.5,2.6,2.3,5.5,2.2,8.5"/>
      <path className="st st2" d="M55.5,257.1c-3.1,1.2-6.2,2.5-9.3,3.9"/>
      <path className="st st3" d="M48.9,118c1.8,5.9,4.9,12.9,10.3,20.1c0.6,0.7,1.8,0.4,1.9-0.5c0.7-7.4,2.7-21.3,11.7-36.9"/>
      <path className="st st3" d="M252,171.7c11-20,40,1.4,33,25.9c-11.4,40-47,32.5-47,32.5c-7.3,20.4-16.7,35.6-22.9,44.4
        c-4.1,5.8-9.1,11-14.8,15.4c-12.7,9.8-39.3,26.7-71.4,30.4"/>
      <path className="st st4" d="M128.9,323.1c0,0,8,19.8,8.4,38.6"/>
    </svg>);
  }
}
