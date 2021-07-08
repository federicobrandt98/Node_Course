const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('Could not connect to MongoDB...',err))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 255
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web','mobile','network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    //Do some Async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);               
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {  type: Date, default: Date.now  },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: '-',
        author: 'Fede',
        tags: null,
        isPublished: true,
        price: 15
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
}

async function getCourses() {

    const courses = await Course
        .find({ author: 'Fede', isPublished: true })
        // .find()
        // .or([ { author: 'Fede' }, { isPublished: true } ])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1});
        // .count();
        console.log(courses);
}

async function updateCourse(id) {
    //Approach: Query First

    // //findByID()
    // const course = await Course.findById(id);
    // if (!course) return;

    // //Modify its properties
    // course.isPublished = true;
    // course.author = 'otro';
    // course.set({
    //     isPublished: true,
    //     author: 'hello'
    // });
    // //save()
    // const result = await course.save();
    // console.log(result);

    //Approach: Update First
    //Update directly
    const result = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'buenches',
            isPublished: false
        }
    }, { new: true });
    //Optionally: get the updated document
    console.log(result);

}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

createCourse();


