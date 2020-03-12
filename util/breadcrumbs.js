export default (context) => {
    // Split the url into parts
    let breadcrumbList = context.route.path.split('/');

    // If the originalUrl ended with '/', pop last item, which will be empty
    if (breadcrumbList[breadcrumbList.length - 1] === '') { breadcrumbList.pop(); }

    // Generate the breadcrumbs
    const lastIndex = breadcrumbList.length - 1;
    let nowUrl = '';
    let position;
    breadcrumbList = breadcrumbList.map((path) => {
        position = breadcrumbList.indexOf(path);
        nowUrl += path + (position === lastIndex ? '' : '/'); // don't append / to last item

        // Get the display name of the route
        let name = 'Home';
        if (path) {
            name = path;

            // Try getting router meta data
            const match = context.app.router.getMatchedComponents(nowUrl);
            if (match.length && match[0].options && match[0].options.meta && match[0].options.meta.breadcrumb) {
                name = match[0].options.meta.breadcrumb;
                if (typeof name === 'function') { name = name(context); }
            }
        }

        // Save it
        return {
            index: name,
            url: nowUrl,
            position: position + 1,
        };
    });

    // Mark the last item
    breadcrumbList[lastIndex].last = true;
    return breadcrumbList;
};
