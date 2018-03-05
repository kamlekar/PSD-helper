var gulp    = require('gulp');
var PSD     = require('psd');
var rename  = require('gulp-rename');


// Variables
var PSD_ROOT_PATH       = `psds/`;
var PSD_SRC_PATH        = `${PSD_ROOT_PATH}*.psd`;
var PNG_VERSION_PATH    = `output/PNG_Versions/`;


function throughPSDs(){
    return gulp.src(PSD_SRC_PATH)
        // Making sure the folder exists
        .pipe(gulp.dest(PNG_VERSION_PATH))
        .pipe(rename(function(x){
            var url = PSD_ROOT_PATH + '/' + x.basename + x.extname;
            console.log(url);
            // var psd = PSD.fromFile(url);
            PSD.open(url).then(psd => {
                console.log(psd);
                
                return psd.image.saveAsPng(`${PNG_VERSION_PATH}${x.basename}.png`);
            })
            .then(() => console.log("Finished!"));
        }))
}

gulp.task('default', throughPSDs);