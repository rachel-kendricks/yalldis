import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1 className="welcome-h1 signika-font-bold">Welcome to Y'ALLDIS!</h1>
      </div>
      <div className="welcome-body-container montserrat-font-light">
        <p>
          Are you tired of spending hours online looking at recipes? Do you
          always forget items on your grocery list, or find that those items are
          not available at the grocery store you shop at?
        </p>
        <div></div>
        <p>
          Y’alldis is here to help! Here at Y’alldis, we try to make grocery
          shopping as easy and painless as possible.{" "}
        </p>
        <div></div>
        <p>
          Our master chefs have crafted delicious recipes for you to choose
          from. And guess what? All of the ingredients can be found in our
          grocery store. As an added bonus, our amazing web developer has
          crafted a website you can use to search recipes and generate a grocery
          list from the ingredients in those recipes.{" "}
        </p>
        <div></div>
        <p>
          Click on the recipes tab to view our recipes. If you see a recipes you
          think you’ll like, add it to your Grocery List. You’ll notice your
          grocery list of ingredients will automatically populate. Once you have
          finished building your Grocery List, you can download a PDF of your
          list and take it with you to the grocery store.{" "}
        </p>
        <div></div>
        <p>Now, grocery shopping can be easy!</p>
      </div>
    </div>
  );
};
