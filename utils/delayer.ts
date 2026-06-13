function delayer(value: string, delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

export default delayer;
