package com.example;

/**
 * Hello world!
 */
public final class App {
    private App() {
    }

    /**
     * Says hello to the world.
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {


        Calculator calculator = new Calculator();

        int result = calculator.add(5, 3);

        System.out.println("Hello World!");
        System.out.println(result);
    }
}
