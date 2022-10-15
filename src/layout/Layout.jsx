import cn from "classnames";
import { createContext, useState, useContext, useMemo } from "react";

const LayoutContext = createContext(null);

function useLayoutController() {
	const [state, setState] = useState({
		sidebar: true,
	});

	const methods = useMemo(
		() => ({
			toggleSidebar() {
				setState((prev) => ({ ...prev, sidebar: !prev.sidebar }));
			},
		}),
		[]
	);

	return { state, methods };
}

export default function Layout({ topBar, sideBar, content, footer }) {
	const { state, methods } = useLayoutController();

	return (
		<LayoutContext.Provider value={[state, methods]}>
			<div className='flex w-full items-stretch min-h-screen isolate'>
				{sideBar && (
					<div className={cn("w-0 relative shrink-0 z-10 transition-[width]", state.sidebar ? "md:w-16 xl:w-64" : "md:w-16")}>
						<div
							className={cn(
								"fixed overflow-y-auto overflow-x-hidden inset-y-0 left-0 overscroll-contain bg-slate-500 transition-[width]",
								state.sidebar ? "w-64" : "md:w-16 w-0"
							)}
						>
							{sideBar}
							<button onClick={methods.toggleSidebar}>Toggle {state.sidebar}</button>
						</div>
					</div>
				)}
				<div className='relative flex flex-col grow min-h-full bg-slate-200 z-0'>
					{topBar && (
						<div className='h-14 md:h-16 sticky -top-px bg-slate-800'>
							{topBar}
							<button onClick={methods.toggleSidebar}>Toggle {state.sidebar}</button>
						</div>
					)}
					<main className='grow'>{content}</main>
					{footer && <footer>{footer}</footer>}
				</div>
			</div>
		</LayoutContext.Provider>
	);
}

export function useLayout() {
	const context = useContext(LayoutContext);
	if (typeof context === "undefined") {
		throw new Error("useLayout must be used within a LayoutProvider");
	}
	return context;
}
