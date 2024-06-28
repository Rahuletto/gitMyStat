export function generateColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
  
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase().padStart(6, '0');
  
    return `#${color}`;
  }