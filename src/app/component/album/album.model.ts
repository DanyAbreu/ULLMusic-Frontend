export interface Album {
    idAlb: string;
    idArt: string;
    nameAlb: string;
    imageAlbUrl: string;
    genresAlb: string;
    releaseDate: string;
    artists: Artist[]
    tracks: Track[];
    userLike: boolean;    
}

export interface Artist {
    idArt: string;
    nameArt: string;
    userLike: boolean;
}


export interface Track {
    idTrack: string;
    idAlb: string;
    idArt: string;
    nameTrack: string;
    popularityTrack: Number;
    previewUrl: string;
    duration: string;
    userLike: boolean;
}