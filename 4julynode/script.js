console.log("Hello World");

const readline = require("readline");
const fs = require("fs");
const filePath = __dirname + "/arr.json";


if (!fs.existsSync(filePath)) {
    console.log("File doesn't exist, creating...");
    fs.writeFileSync(filePath, "[]");
}

let arr = JSON.parse(fs.readFileSync(filePath, "utf-8"));

function saveArr() {
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
}

function printTodos() {
    if (arr.length === 0) {
        console.log("No todos found.");
    } else {
        arr.forEach((todo, i) => {
            console.log(`${i + 1}. ${todo.name}`);
        });
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mainMenu() {
    rl.question(
        "\nWelcome to CLI TODO\n 1. Add todo\n 2. View todos\n 3. Delete todo\n 4. Update todo\nChoose option: ",
        (ans) => {
            switch (ans.trim()) {
                case "1":
                    rl.question("Add Todo data? ", (todo) => {
                        arr.push({
                            val: arr.length,
                            name: todo
                        });
                        saveArr();
                        console.log("Todo added successfully");
                        mainMenu();
                    });
                    break;
                case "2":
                    printTodos();
                    break;
                case "3":
                    printTodos();
                    rl.question("Enter the number to delete: ", (num) => {
                        const idx = Number(num) - 1;
                        if (arr[idx]) {
                            arr.splice(idx, 1);
                            saveArr();
                            console.log("Todo deleted!");
                        } else {
                            console.log("Invalid number.");
                        }
                        mainMenu();
                    });
                    break;
                case "4":
                    printTodos();
                    rl.question("Enter the number to update: ", (num) => {
                        const idx = Number(num) - 1;
                        if (arr[idx]) {
                            rl.question("Enter new todo text: ", (text) => {
                                arr[idx].name = text;
                                saveArr();
                                console.log("Todo updated!");
                                mainMenu();
                            });
                        } else {
                            console.log("Invalid number.");
                            mainMenu();
                        }
                    });
                    break;
                default:
                    console.log("Invalid option selected");
                    mainMenu();
            }
        }
    );
}

mainMenu();

rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
});
