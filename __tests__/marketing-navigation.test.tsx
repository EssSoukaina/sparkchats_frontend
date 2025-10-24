import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MarketingScreen from "../app/(tabs)/marketing";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: ({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

const mockedUseRouter = useRouter as jest.Mock;

describe("MarketingScreen navigation", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    pushMock.mockReset();
    mockedUseRouter.mockReturnValue({ push: pushMock });
  });

  it("routes to template selection when viewing campaigns and pressing the FAB", () => {
    const { getByTestId } = render(<MarketingScreen />);

    fireEvent.press(getByTestId("campaign-action"));
    fireEvent.press(getByTestId("fab-button"));

    expect(pushMock).toHaveBeenCalledWith(
      "/(testaicampaign)/TemplateSelection"
    );
  });

  it("routes to the AI campaign creator when viewing templates and pressing the FAB", () => {
    const { getByTestId } = render(<MarketingScreen />);

    fireEvent.press(getByTestId("template-action"));
    fireEvent.press(getByTestId("fab-button"));

    expect(pushMock).toHaveBeenCalledWith(
      "/(testaicampaign)/AICampaignCreator"
    );
  });
});
