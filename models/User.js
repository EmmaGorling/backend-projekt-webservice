const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

// Hash password
userSchema.pre('save', async function(next) {
    try {
        // If user is new or password has been modified
        if(this.isNew || this.isModified('password')) {
            // Hash password and store it
            const hashedPassword = await bcrypt.hash(this.password, 10);
            // Save hashed password in user.password
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Register user
userSchema.statics.register = async(username, password) => {
    try {
        // Create a instance of User
        const user = new this({ username, password });
        // Save created user
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
} 
// Compare hashed password
userSchema.methods.comparePassword = async function(password) {
    try {
        // True/false return of comparisson
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

// Login user
userSchema.statics.login = async function(username, password) {
    try {
        // Find user by username
        const user = await this.findOne({ username });
        // If there is no user
        if(!user) {
            throw new Error('Incorrect username/password');
        }
        // Compare passwords
        const isPasswordMatched = await user.comparePassword(password);
        // Incorrect password?
        if(!isPasswordMatched) {
            throw new Error('Incorrect username/password');
        }
        // Correct password
        return user;
    } catch (error) {
        throw error;
    }
}



const User = mongoose.model('User', userSchema);
module.exports = User;



        
        
        