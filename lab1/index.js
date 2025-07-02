const arr1 = [1,3,5,7,9]
const arr2 = [2,4,6,8,10]
console.log("array 1: ",arr1)
console.log("spreaded array: ",...arr1)
const mergedArray = [...arr1,...arr2]
console.log("Merged array: ",mergedArray)
const addNumber=(...values)=>{
    let sum=0
    values.forEach(
        (ele, index)=>{
            sum = sum + ele
        }
    )
    return sum
}
const result= addNumber(1,2,3,4,5,6,7,8,9,10)
console.log("result: ", result)

const vegetable = ["tomato","potato","onion"]
const newVegetable = vegetable.map(
    (ele, index)=>{
        return ele.toUpperCase()
    }
)
console.log("new vegetables: ", newVegetable)

let student = {
    name: "Ritnesh Thakur",
    age: "22",
    rollno: "14"
}
//accessing obj key's value
//dot notation
console.log("name: ", student.name)
//bracket notation
console.log("age", student["age"])
student["address"]="Bhaktapur"
student.contact=987654321
console.log("", student)
student.age=21
console.log("",student)

//converting object to array
const key = Object.keys(student)
const entries = Object.entries(student)
entries.forEach(
    ([key, value])=>{
        console.log(key,value)
    }

)