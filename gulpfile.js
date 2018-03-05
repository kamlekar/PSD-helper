var gulp    = require('gulp');
var PSD     = require('psd');
var rename  = require('gulp-rename');
var del     = require('del');


// Variables
var PSD_ROOT_PATH       = `psds/`;
var PSD_SRC_PATH        = `${PSD_ROOT_PATH}*.psd`;
var OUTPUT              = `output`;
var PNG_VERSION_PATH    = `${OUTPUT}/PNG_Versions/`;


function throughPSDs(){
    // delete existing files, before starting the task
    del([
        `${OUTPUT}/*`
    ]);

    return gulp.src(PSD_SRC_PATH)
        // Making sure the folders exists
        .pipe(gulp.dest(PNG_VERSION_PATH))
        .pipe(rename(function(x){
            var url = `${PSD_ROOT_PATH}/${x.basename}${x.extname}`;
            console.log(url);
            // var psd = PSD.fromFile(url);
            PSD.open(url).then(psd => {
                console.log(psd);
                var rawFile = `${PNG_VERSION_PATH}${x.basename}`;
                psd.image.saveAsPng(`${rawFile}.png`);
                // Delete PSD file
                del([
                    `${rawFile}.psd`
                ]);
            })
            .then(() => console.log("Finished!"));
        }))
}

gulp.task('default', throughPSDs);