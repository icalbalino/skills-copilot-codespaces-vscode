function skillsMember() {
    return {
        name: 'Ical',
        age: 25,
        skills: ['JavaScript', 'Pyhton', 'Node.js'],
        greet: function() {
            console.log(`Hello ${this.name}`);
        }
    };
}