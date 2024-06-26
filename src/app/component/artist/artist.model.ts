export interface Album {
    idAlb: string;
    nameAlb: string;
    imageAlbUrl: string;
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

export interface Artist {
    idArt: string;
    nameArt: string;
    imageArtUrl: string;
    genresArt: string;
    popularityArt: number;
    followers: number;
    summary: string;
    content: string;
    albums: Album[];
    tracks: Track[]; 
    userLike: boolean;
}
