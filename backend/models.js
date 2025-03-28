import mongoose from 'mongoose';

let models = {};
console.log("connecting to MongoDB...")
await mongoose.connect("mongodb+srv://leo:5dADxBjC11gbcQo7@daymaxcluster.b1fuq.mongodb.net/DayMax")
console.log("success");

// User table
const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
});
models.User = mongoose.model('User', userSchema);
console.log("user schema successful!")

// Symptoms table
// const symptomsSchema = new mongoose.Schema({
//     user_id: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     },
//     date: Date
//     });
// models.Symptoms = mongoose.model('Symptoms', symptomsSchema);
// console.log("symptoms schema successful!")

// User's Daily Statistics table
// const dailyStatsSchema = new mongoose.Schema({
//     date: { type: Date, required: true },
//     user_id: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     },
//     water: { type: Number, required: true },
//     sleep: { type: Number, required: true },
//     heart_rate: { type: Number, required: true },
//     meds: { type: String }
// });
// models.DailyStats = mongoose.model('DailyStats', dailyStatsSchema);
// console.log("dailystats schema successful!")

//Water Tracker table
const waterSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    date: Date,
    water: Number,
    waterGoal: Number,
    entryType: String
});
models.WaterStats = mongoose.model("WaterStats", waterSchema);
console.log("water stat schema successful!")

//Sleep Tracker table
const sleepSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    bedTime: Date,
    wakeTime: Date,
    sleepGoalHour: Number,
    sleepGoalMin: Number,
    sleepGoalAchievement: Number,
    entryType: String
});
models.SleepStats = mongoose.model("SleepStats", sleepSchema);
console.log("sleep stat schema successful!")

// Health Resources table
const healthResourcesSchema = new mongoose.Schema({
    url: String
});
models.HealthResources = mongoose.model('HealthResources', healthResourcesSchema);
console.log("health resources schema successful!")

// Health Diary table
const diarySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    entry: { type: String, required: true },
    date: Date
});
models.Diary = mongoose.model('Diary', diarySchema);
console.log("diary schema successful!")

// Health Buddy table
const buddySchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    date: Date
});
models.Buddy = mongoose.model('Buddy', buddySchema);
console.log("health buddy schema successful!")

// Medications table
const medicationSchema = new mongoose.Schema({
    // user_id: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User',
    //     required: true
    // },
    user_id: { type: String, required: true },
    medicationName: String,
    medDescription: String,
    medFrequency: Number,
    medTakenCount: {
        type: Number,
        default: 0, // Start with 0 count
    },
    lastMedTakenDate: {
        type: Date,
        default: Date.now,
    }
});
models.Medications = mongoose.model('Medications', medicationSchema);
console.log("medications schema successful!")

console.log("All Mongoose models created!")

export default models;