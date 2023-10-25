export interface Weather {
    main: {
      humidity:number;
      temp:number;
    };
    name:string;
    weather:[
      {
        description:string;
        main:string;
      }
    ];
    wind: {
      speed:number;
    };
}