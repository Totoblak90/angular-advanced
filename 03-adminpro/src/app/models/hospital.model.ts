interface _UserOfHospital {
    _id: string,
    nombre: string;
    img: string;
}

export class Hospital {
    constructor(
        public nombre: string,
        public _id?: string,
        public usuario?: _UserOfHospital,
        public img?: string
    ) {}
}