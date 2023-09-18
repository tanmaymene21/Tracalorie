import Storage from './Storage';

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMealItems();
        this._workouts = Storage.getWorkoutItems();

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayProgress();

        document.querySelector('#limit').value = this._calorieLimit;
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.setTotalCalories(this._totalCalories);
        Storage.setMealItemsToStorage(meal);

        this._render()
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.setTotalCalories(this._totalCalories);
        Storage.setWorkoutItemsToStorage(workout);

        this._render();
    }

    removeMeal(id) {
        const index = this._meals.findIndex(meal => meal.id === id);

        if(index != -1) {
            const meal = this._meals[index];

            this._totalCalories -= meal.calories;
            Storage.setTotalCalories(this._totalCalories);
            this._meals.splice(index, 1);
            Storage.removeMealFromStorage(id);

            this._render();
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex(workout => workout.id === id);

        if(index != -1) {
            const workout = this._workouts[index];

            this._totalCalories += workout.calories;
            Storage.setTotalCalories(this._totalCalories);
            this._workouts.splice(index, 1);
            Storage.removeWorkoutFromStorage(id);

            this._render();
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();

        this._render();
    }

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this._displayCaloriesLimit();

        this._render();
    }

    loadItems() {
        this._meals.forEach(meal => this._displayMeal(meal));
        this._workouts.forEach(workout => this._displayWorkout(workout));
    }

    _displayCaloriesTotal() {
        const totalCaloriesEl = document.querySelector('#calories-total');
        totalCaloriesEl.innerText = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitEl = document.querySelector('#calories-limit');
        calorieLimitEl.innerText = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const calorieConsumedEl = document.querySelector('#calories-consumed');
        // using _meals.reduce
        const consumed = this._meals.reduce((acc, curr) =>  acc + curr.calories, 0);
        calorieConsumedEl.innerText = consumed;
    }

    _displayCaloriesBurned() {
        const caloriBurnedEl = document.querySelector('#calories-burned');
        const burned = this._workouts.reduce((acc, curr) => acc + curr.calories, 0);
        caloriBurnedEl.innerText = burned;
    }
    
    _displayCaloriesRemaining() {
        const calorieProgressEl = document.querySelector('#calorie-progress');
        const calorieRemainingEl = document.querySelector('#calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        calorieRemainingEl.innerText = remaining;

        if(remaining <= 0) {
            calorieRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            calorieRemainingEl.parentElement.parentElement.classList.remove('bg-light');

            calorieProgressEl.classList.remove('bg-success');
            calorieProgressEl.classList.add('bg-danger');
        }
        else {
            calorieRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            calorieRemainingEl.parentElement.parentElement.classList.add('bg-light');

            calorieProgressEl.classList.remove('bg-danger');
            calorieProgressEl.classList.add('bg-success');
        }
    }

    _displayProgress() {
        const calorieProgressEl = document.querySelector('#calorie-progress');
        const percentage = this._totalCalories / this._calorieLimit * 100;
        const width = Math.min(percentage, 100);
        calorieProgressEl.style.width = `${width}%`;
    }

    _displayMeal(meal) {
        const mealItemsEl = document.querySelector('#meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);

        mealEl.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>`;

        mealItemsEl.appendChild(mealEl);
    }
    
    _displayWorkout(workout) {
        const workoutItemsEl = document.querySelector('#workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);

        workoutEl.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>`;

        workoutItemsEl.appendChild(workoutEl);
    }

    


    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayProgress();
    }
}

export default CalorieTracker;
