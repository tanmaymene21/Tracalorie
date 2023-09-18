class Storage {
    static getCalorieLimit(defaultCalorieLimit = 2000) {
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultCalorieLimit;
        }
        else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultTotalCalories = 0) {
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultTotalCalories;
        }
        else {
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static setTotalCalories(totalCalories) {
        localStorage.setItem('totalCalories', totalCalories);
    }

    static getMealItems() {
        let mealItemsFromStorage;
        if(localStorage.getItem('Meal-Items') === null) {
            mealItemsFromStorage = [];
        }
        else {
            mealItemsFromStorage = JSON.parse(localStorage.getItem('Meal-Items'));
        }
        return mealItemsFromStorage;
    }

    static setMealItemsToStorage(item) {
        let mealItemsFromStorage = this.getMealItems();
        mealItemsFromStorage.push(item);
        localStorage.setItem( 'Meal-Items', JSON.stringify(mealItemsFromStorage));
    }
    
    static removeMealFromStorage(id) {
        const mealItemsFromStorage = this.getMealItems();
        mealItemsFromStorage.forEach((meal, index) => {
            if(meal.id === id) {
                mealItemsFromStorage.splice(index, 1);
            }
        });

        localStorage.setItem('Meal-Items', JSON.stringify(mealItemsFromStorage));
    }

    static removeWorkoutFromStorage(id) {
        const workoutitemsFromStorage = this.getWorkoutItems();
        workoutitemsFromStorage.forEach((workout, index) => {
            if(workout.id === id) {
                workoutitemsFromStorage.splice(index, 1);
            }
        });

        localStorage.setItem('Workout-Items', JSON.stringify(workoutitemsFromStorage));
    }

    static getWorkoutItems() {
        let workoutitemsFromStorage;
        if(localStorage.getItem('Workout-Items') === null) {
            workoutitemsFromStorage = [];
        }
        else {
            workoutitemsFromStorage = JSON.parse(localStorage.getItem('Workout-Items'));
        }
        return workoutitemsFromStorage;
    }

    static setWorkoutItemsToStorage(item) {
        let workoutitemsFromStorage = this.getWorkoutItems();
        workoutitemsFromStorage.push(item);
        localStorage.setItem('Workout-Items', JSON.stringify(workoutitemsFromStorage));
    }

    static clearAll() {
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('Meal-Items');
        localStorage.removeItem('Workout-Items');
    }
}

export default Storage;