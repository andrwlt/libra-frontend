interface LibraLogoProps {
  height?: number;
  width?: number;
  fill?: string;
}

export default function LibraLogo({ height, width, fill = 'rgb(30, 37, 53)' }: LibraLogoProps) {
  return (
    <svg height={height} width={width} fill={fill} viewBox="0 0 500 158.9">
      <polygon points="236.37 40.29 220.82 40.29 220.82 132.35 280.22 132.35 280.22 117.13 236.47 117.13 236.37 40.29" />
      <rect x="289.68" y="62.3" width="14.79" height="70.05" />
      <rect x="289.4" y="36.93" width="15.35" height="15.41" />
      <path d="M376.98,71.9c-2.47-3.17-5.61-5.71-9.34-7.55-3.74-1.85-8.14-2.79-13.09-2.79-5.66,0-10.54,1.1-14.52,3.28-3.02,1.65-5.6,3.86-7.69,6.6v-31.22h-14.79v92.32h14.79v-10.36c.89,1.87,3.27,6.04,7.66,8.63,3.75,2.22,8.51,3.29,14.55,3.29,4.99,0,9.41-.94,13.13-2.79,3.71-1.85,6.84-4.4,9.31-7.58,2.45-3.17,4.31-6.91,5.52-11.14,1.2-4.19,1.81-8.77,1.81-13.63,0-4.55-.57-11.45-1.81-15.84-1.21-4.29-3.07-8.06-5.52-11.2Zm-8.22,34.91c0,4.12-1.57,7.37-4.8,9.92-3.25,2.57-7.52,3.87-12.68,3.87-6.12,0-10.86-1.74-14.07-5.17-3.39-3.62-4.87-5.75-4.87-10.99v-10.99c0-5.33,1.64-9.79,4.87-13.27,3.21-3.45,7.94-5.2,14.07-5.2,5.16,0,9.43,1.31,12.68,3.9,3.23,2.57,4.8,5.82,4.8,9.95v17.98Z" />
      <polygon points="391.44 132.35 406.23 132.35 406.23 75.35 428.33 75.35 428.33 62.3 391.44 62.3 391.44 132.35" />
      <path d="M489.52,119.37v-31.95c0-4.76-.82-9.59-2.13-12.61-1.42-3.26-3.46-5.97-6.06-8.06-2.57-2.07-5.63-3.63-9.1-4.66-3.43-1.02-7.19-1.53-11.16-1.53s-7.74,.59-11.2,1.75c-3.48,1.17-6.55,2.86-9.12,5.01-2.59,2.16-4.68,4.76-6.21,7.71-1.55,2.98-2.33,6.3-2.33,9.88v1h14.79v-1c0-2.2,.32-4.1,.94-5.65,.61-1.5,1.52-2.72,2.72-3.62,2.52-1.89,5.98-2.86,10.27-2.86,2.18,0,4.18,.21,5.95,.63,1.7,.41,3.16,1.11,4.35,2.09,1.18,.97,2.11,2.32,2.76,4,.67,1.73,1.01,3.97,1.01,6.66v2.95l-22.8,2.11c-7.14,.64-12.5,2.97-16.06,6.99-3.57,4.02-5.36,8.84-5.36,14.46,0,2.84,.51,5.56,1.54,8.17,1.03,2.61,2.48,4.85,4.36,6.73,2.11,2.15,4.6,3.78,7.48,4.87,2.88,1.1,6.11,1.65,9.68,1.65,5.35,0,9.95-1.22,13.8-3.67,3.84-2.45,6.75-6.21,8.72-11.29l.1,2.11,.23,11.11h23.66v-12.98h-10.84Zm-14.51-16.17c0,5.63-1.44,10.23-4.31,13.79-2.87,3.56-6.8,5.33-11.79,5.33-3.51,0-6.27-.67-8.26-2.01-2-1.34-2.99-3.44-2.99-6.32v-5.51c0-1.8,.29-3.21,.87-4.25,.58-1.04,2-1.64,4.28-1.8l22.21-2.05v2.82Z" />
      <path d="M109.66,93.9c-.6-.13-.97-.29-1.13-.4-1.04-4.09,1.98-22.96,20.75-67.58l-14.13-5.94c-28.54,67.86-22.29,77.58-19.62,81.73,1.65,2.57,4.9,5.91,10.96,7.19,1.74,.37,3.59,.53,5.52,.53,16.48,0,38.61-12.15,42.77-14.88l-8.43-12.8c-7.86,5.18-28.25,13.93-36.68,12.15Z" />
      <path d="M89.22,138.06c-16.71,6.89-30.75,7.34-41.74,1.32-29.16-15.97-14.36-84.2-2.46-118.05l-14.46-5.08c-1.69,4.81-10.3,30.2-13.86,58.16-5.17,40.69,2.7,67.07,23.41,78.41,7.98,4.37,16.36,6.07,24.6,6.07,28.57,0,55.32-20.54,56.76-21.66l-9.43-12.09c-.09,.07-9.66,7.48-22.82,12.91Z" />
      <path d="M57.65,79.99c4.19-29.82,18.48-67.54,21.12-73.73L64.66,.25c-3.34,7.84-17.8,46.29-22.2,77.61l15.18,2.13Z" />
      <path d="M81.48,88.48C88.3,47.79,107.13,6.91,107.32,6.51L93.44,0c-.2,.42-19.92,43.24-27.08,85.95l15.12,2.53Z" />
    </svg>
  );
}