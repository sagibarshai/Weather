type cssBreakPoints = {
     bigDesktop: string;
     laptop: string;
     mobile: string;
};
const cssBreakPoints: cssBreakPoints = {
     bigDesktop: `(min-width:1920px)`,
     laptop: `(min-width:1280px) and (max-width:1919px)`,
     mobile: `(max-width:1279px)`,
};
export default cssBreakPoints;
