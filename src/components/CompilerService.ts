import { delay, SAMPLE_COMPILATION_OUTPUT } from '../lib/utils';

interface CompilationResult {
  output: string;
  error: boolean;
}

export class CompilerService {
  private static instance: CompilerService;

  private constructor() {}

  public static getInstance(): CompilerService {
    if (!CompilerService.instance) {
      CompilerService.instance = new CompilerService();
    }
    return CompilerService.instance;
  }

  /**
   * Simulates compiling and running C++ code
   * In a real implementation, this would send the code to a backend service
   * that compiles and runs the code using a real C++ compiler.
   */
  public async compileAndRun(code: string): Promise<CompilationResult> {
    // Simulate compilation delay
    await delay(1500);
    
    // Simple simulation of error detection
    if (code.includes('std::cout') && !code.includes('#include <iostream>')) {
      return {
        output: SAMPLE_COMPILATION_OUTPUT.error,
        error: true
      };
    }
    
    // Check for common syntax errors
    if (
      (code.includes('cout') && !code.includes('std::cout')) ||
      (code.includes('main()') && !code.includes('int main()')) ||
      (!code.includes('return 0') && code.includes('int main()')) ||
      (code.includes(';') && code.includes('cout') && !code.includes(';'))
    ) {
      return {
        output: this.generateCustomError(code),
        error: true
      };
    }

    // Otherwise return success output
    return {
      output: SAMPLE_COMPILATION_OUTPUT.success,
      error: false
    };
  }

  private generateCustomError(code: string): string {
    let errorMsg = 'Compiling...\n';
    
    if (code.includes('cout') && !code.includes('std::cout')) {
      errorMsg += "error: 'cout' is not a member of 'std'\n";
      errorMsg += "    cout << \"Hello, World!\" << std::endl;\n";
      errorMsg += "    ^\n";
      errorMsg += "note: suggested alternative: 'std::cout'\n";
    } else if (!code.includes('return 0') && code.includes('int main()')) {
      errorMsg += "warning: non-void function 'main' should return a value\n";
      errorMsg += "int main() {\n";
      errorMsg += "^\n";
    } else {
      errorMsg += "error: syntax error\n";
    }
    
    errorMsg += "\nCompilation failed.";
    return errorMsg;
  }

  /**
   * Cancels a running compilation/execution
   * In a real implementation, this would signal the backend to terminate
   * the running process.
   */
  public async stop(): Promise<void> {
    await delay(300);
    return Promise.resolve();
  }
}