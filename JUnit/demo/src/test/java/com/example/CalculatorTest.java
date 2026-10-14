package com.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Tests the Calculator arithmetic operations.
 */
public class CalculatorTest {

    private static final int FIRST_NUMBER = 5;
    private static final int SECOND_NUMBER = 3;
    private static final int EXPECTED_SUM = 8;
    private static final int EXPECTED_DIFFERENCE = 2;

    private final Calculator calculator = new Calculator();

    @Test
    void testAdd() {
        assertEquals(
            EXPECTED_SUM,
            calculator.add(FIRST_NUMBER, SECOND_NUMBER)
        );
    }

    @Test
    void testSubtract() {
        assertEquals(
            EXPECTED_DIFFERENCE,
            calculator.subtract(FIRST_NUMBER, SECOND_NUMBER)
        );
    }
}
