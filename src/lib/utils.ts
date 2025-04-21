import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Sample C++ code for the editor
export const DEFAULT_CPP_CODE = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

// Sample compilation output for the terminal
export const SAMPLE_COMPILATION_OUTPUT = {
  success: `Compiling...
Done!
Running program...

Hello, World!

Program exited with code 0`,
  error: `Compiling...
error: 'cout' is not a member of 'std'
    std::cout << "Hello, World!" << std::endl;
         ^
note: suggested alternative: 'cout'
    std::cout << "Hello, World!" << std::endl;
         ^
         cout
1 error generated.

Compilation failed.`
};

// Function to simulate compilation delay
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}