import React from "react";
import "./RecentActivites.css";

const RecentActivities = ({ activities, title = "Recent Activities", limit = 5 }) => {
    return (
        <div className="recent-activities">
            <h2>{title}</h2>
            <div className="activities-list">
                {activities.slice(0, limit).map((activity, index) => (
                    <div key={index} className="activity-item">
                        <div className="activity-dot"></div>
                        <div className="activity-content">
                            <p className="activity-description">{activity.description}</p>
                            <span className="activity-time">
                                {new Date(activity.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;
