const mockAIService = {
  convertThoughtToCode: (thought, language) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = `// ${language.toUpperCase()} code generated from thought: ${thought}\n\n`;
        const randomCode = generateRandomCode(language);
        resolve(code + randomCode);
      }, 500);
    });
  }
};

function generateRandomCode(language) {
  const codeSnippets = {
    javascript: `function processThought(thought) {\n  console.log("Processing:", thought);\n  return thought.toUpperCase();\n}`,
    python: `def process_thought(thought):\n    print("Processing:", thought)\n    return thought.upper()`,
    java: `public class ThoughtProcessor {\n    public static String processThought(String thought) {\n        System.out.println("Processing: " + thought);\n        return thought.toUpperCase();\n    }\n}`,
    cpp: `#include <iostream>\n#include <string>\n\nstd::string processThought(const std::string& thought) {\n    std::cout << "Processing: " << thought << std::endl;\n    return thought;\n}`,
    csharp: `public class ThoughtProcessor {\n    public static string ProcessThought(string thought) {\n        Console.WriteLine($"Processing: {thought}");\n        return thought.ToUpper();\n    }\n}`
  };

  return codeSnippets[language] || "// Code not available for this language";
}

export default mockAIService;