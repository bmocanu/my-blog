---
title: Golang
published: 2026-11-05
updated: 2026-11-05
tags: [golang, reference]
---

Go language reference, based on the awesome course [Learn Go by boot.dev](https://www.boot.dev/courses/learn-golang).

## Basics

Declare variables:

```go
var health int
health = 100

var health int = 100
health := 100

var message string = "Hello Go!"
var price float64 = 3.566
var dataContent byte = 0xFF

health, message := 100, "Hello Go!"

const pi = 3.14159
```

Types:
- signed integers: int, int8, int16, int32, int64
- unsigned integers: uint, uint8, uint16, uint32, uint64, uintpr
- signed decimal numbers: float32, float64
- complex numbers: complex64, complex128

Default types: bool, string, int, uint, byte, rune, float64, complex128

Formatting strings:

```go
s := fmt.Sprintf("I am %v years old", 10)
s := fmt.Sprintf("I am %s years old", "way too many")
s := fmt.Sprintf("I am %d years old", 10)
s := fmt.Sprintf("I am %.2f years old", 10.523)
```

## Standard blocks

The conditional block:

```go
if height > 6 {
    fmt.Println("You are super tall!")
} else if height > 4 {
    fmt.Println("You are tall enough!")
} else {
    fmt.Println("You are not tall enough!")
}

if length := getLength(email); length < 10 {
    fmt.Printf("Email must be at least 10 characters, is %d\n", length)
}
```

The switch block:

```go
func getCreator(os string) string {
    var creator string
    switch os {
    case "linux":
        creator = "Linus Torvalds"
    case "windows":
        creator = "Bill Gates"
    case "mac":
        creator = "A Steve"
    default:
        creator = "Unknown"
    }
    return creator
}

// The fallthrough keyword
func getCreator(os string) string {
    var creator string
    switch os {
    case "linux":
        creator = "Linus Torvalds"
    case "windows":
        creator = "Bill Gates"

    case "macOS":
        fallthrough
    case "Mac OS X":
        fallthrough
    case "mac":
        creator = "A Steve"

    default:
        creator = "Unknown"
    }
    return creator
}
```

Type switches:

```go
func printNumericValue(num interface{}) {
    switch v := num.(type) {
    case int:
        fmt.Printf("%T\n", v)
    case string:
        fmt.Printf("%T\n", v)
    default:
        fmt.Printf("%T\n", v)
    }
}

func main() {
    printNumericValue(1)
    // prints "int"

    printNumericValue("1")
    // prints "string"

    printNumericValue(struct{}{})
    // prints "struct {}"
}
```

For loops:

```go
for i := 0; i < 10; i++ {
  fmt.Println(i)
}

// ommit the condition
for i := 0; ; i++ {
  fmt.Println(i)
  // add custom condition for breaking the loop
}

// loop on the condition
// init the value here
for i < 10 {
  fmt.Println(i)
  // add custom condition for breaking the loop
}

// use continue and break to control the loop
for i := 0; i < 10; i++ {
  if i % 2 == 0 {
    continue
  }
  if i % 3 == 0 {
    break
  }
  fmt.Println(i)
}
```



## Functions 

```go
func addToDatabase(hp, damage int, name string, level int) {
  // ?
}

func calculator(a, b int) (mul, div int, err error) {
    if b == 0 {
      return 0, 0, errors.New("can't divide by zero")
    }
    mul = a * b
    div = a / b
    return mul, div, nil
}

// -------------------------

func aggregate(a, b, c int, arithmetic func(int, int) int) int {
  firstResult := arithmetic(a, b)
  secondResult := arithmetic(firstResult, c)
  return secondResult
}

func main() {
    sum := aggregate(2, 3, 4, add)
    // sum is 9
    product := aggregate(2, 3, 4, mul)
    // product is 24
}
```

Anonymous functions:

```go
func double(a int) int {
    return a + a
}

func main() {
    // using a named function
    newX, newY, newZ := conversions(double, 1, 2, 3)
    // newX is 2, newY is 4, newZ is 6

    // using an anonymous function
    newX, newY, newZ = conversions(func(a int) int {
        return a + a
    }, 1, 2, 3)
    // newX is 2, newY is 4, newZ is 6
}
```

Deferring functions, so that they are executed when exiting the current function:

```go
func GetUsername(dstName, srcName string) (username string, err error) {
    // Open a connection to a database
    conn, _ := db.Open(srcName)

    // Close the connection *anywhere* the GetUsername function returns
    defer conn.Close()

    username, err = db.FetchUser()
    if err != nil {
        // The defer statement is auto-executed if we return here
        return "", err
    }

    // The defer statement is auto-executed if we return here
    return username, nil
}

func CreateTempFile() {
    f, _ := os.Create("temp-42.txt")
    defer os.Remove(f.Name()) // executed second
    defer f.Close()           // executed first

    fmt.Fprintln(f, "How many roads must a man walk down?")
}
```

## Structs

```go
type car struct {
    brand      string
    model      string
    doors      int
    mileage    int
}

myCar := car{
    brand:   "Toyota",
    model:   "Camry",
    doors:   4,
    mileage: 5000,
}

// anonymous structs
myCar := struct {
    brand string
    model string
} {
    brand: "Toyota",
    model: "Camry",
}

type car struct {
  brand string
  model string
  doors int
  mileage int
  // wheel is a field containing an anonymous struct
  wheel struct {
    radius int
    material string
  }
}

var myCar = car{
  brand:   "Rezvani",
  model:   "Vengeance",
  doors:   4,
  mileage: 35000,
  wheel: struct {
    radius   int
    material string
  }{
    radius:   35,
    material: "alloy",
  },
}
```

Embedded structs:

```go
type car struct {
  brand string
  model string
}

type truck struct {
  // "car" is embedded, so the definition of a
  // "truck" now also additionally contains all
  // of the fields of the car struct
  car
  bedSize int
}
```

Struct methods:

```go
type rect struct {
  width int
  height int
}

// area has a receiver of (r rect)
// rect is the struct
// r is the placeholder
func (r rect) area() int {
  return r.width * r.height
}

var r = rect{
  width: 5,
  height: 10,
}

fmt.Println(r.area())

// empty structs
// anonymous empty struct type
empty := struct{}{}

// named empty struct type
type emptyStruct struct{}
namedEmpty := emptyStruct{}
```

## Interfaces

Interfaces are just collections of method signatures.

```go
type shape interface {
  area() float64
  perimeter() float64
}

type rect struct {
    width, height float64
}
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perimeter() float64 {
    return 2*r.width + 2*r.height
}

type circle struct {
    radius float64
}
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perimeter() float64 {
    return 2 * math.Pi * c.radius
}

// Named parameters in method declaration
type Copier interface {
  Copy(sourceFile string, destinationFile string) (bytesCopied int)
}
```

Interface assertions (checking that a type is of certain interface):

```go
type shape interface {
    area() float64
}

type circle struct {
    radius float64
}

func (c circle) area() float64 {
    // ...
}

func printShapeInfo(s shape) {
    c, ok := s.(circle)
    if ok {
        radius := c.radius
        fmt.Printf("s is a circle, radius: %v\n", radius)
        return
    }
}
```

Implemeting the Error interface:

```go
type userError struct {
    name string
}

func (e userError) Error() string {
    return fmt.Sprintf("%v has a problem with their account", e.name)
}

// Then it can be used like this:

func sendSMS(msg, userName string) error {
    if !canSendToUser(userName) {
        return userError{name: userName}
    }
    ...
}

var err error = errors.New("something went wrong")
```


## To remember

1. Empty structs in Go take up no memory space (zero bytes of memory)
2. Memory padding can be an issue with structs (e.g. Go usually favors the `uint16` to start on an even memory address, therefore an `uint8` before an `uint16` in a struct will lead to a padding of 1 byte to be added after the `uint8`), and the order of the fields in a struct matters. Use `unsafe.Sizeof`, `unsafe.Offsetof` (or `reflect.Type.Size`) to inspect a struct on a target architecture.
3. A good rule of thumb for structs is to order the fields descending by their size

